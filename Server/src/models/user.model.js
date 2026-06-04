import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    password: {
        type: String,
        minlength: 6,
        default: null,
        select: false, // hidden by default
    },

    contactNumber: {
        type: String,
        unique: true,
        sparse: true
    },

    authProvider: {
        type: String,
        enum: ["local", "google", "github"],
        default: "local",
    },

    // Helps us to delete the user from Firebase when user deletes their account from our app so next time when user register with same email it can register by any social login method or local method.

    firebaseUid: {
        type: String,
        required: function () {
            return this.authProvider !== "local";
        },
        unique: true,
    },

    avatar: {
        url: {
            type: String,
            default: "https://ik.imagekit.io/AIWebsiteBuilder/Ilustrasi%20Vektor%20Avatar%20Pria%20Dengan%20Bingkai%20Lingkaran,%20Avatar,%20Avatar%20Pria,%20Profil%20PNG%20dan%20Vektor%20dengan%20Background%20Transparan%20untuk%20Unduh%20Gratis.jpeg"
        },
        // Helps to delete the images from ImageKit when user deletes or updates avatar
        fileId: {
            type: String,
            default: null
        }
    },

    pages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
        },
    ],

    credits: {
        type: Number,
        default: 30,
    },

    stripeCustomerId: {
        type: String,
        default: null,
    },

    role: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free",
    },

    refreshToken: {
        type: String
    },
},
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;