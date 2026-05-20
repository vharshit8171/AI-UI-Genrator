import mongoose from "mongoose";
import bcrypt from "bcrypt";

const providerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["google", "github"],
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
},
    { _id: false }
);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    websites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
        },
    ],

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

    providers: [providerSchema], // allows multiple social accounts

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

    credits: {
        type: Number,
        default: 50,
    },

    deployedWebsites: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Website",
            }
        ],
        default: []
    },

    role: {
        type: String,
        enum: ["free", "pro"],
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