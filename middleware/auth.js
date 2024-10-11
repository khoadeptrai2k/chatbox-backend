const partnerSchema = require('../models/schema/partnerSchema')
const UserSchema = require('../models/schema/userSchema')
const BcryptData = require('./bcryptData')

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const partner = req.header("partner")

        if(!partner) {
            if(!token) return res.status(400).json({msg: "Invalid Authentication."})

            const decoded = await BcryptData.VerifyDecodeData({token})
    
            const user = await UserSchema.findOne({_id: decoded.token.id})
            if(!user) return res.status(400).json({msg: "Invalid Authentication."})
            
            req.user = user
        } else {
            let partnerInDB = await partnerSchema.findOne({title: partner});
            if(!partnerInDB) return res.status(400).json({msg: "Invalid Parner!"});

            if (token) {
                const decodedToken = await BcryptData.VerifyDecodeData({token})
                const userToken = await UserSchema.findOne({_id: decodedToken.token.id})
                if(!userToken) return res.status(400).json({msg: "Invalid Authentication."})
                
                req.user = userToken
                req.partner = partnerInDB
            } else {
                req.partner = partnerInDB
            }
        }
        next() 
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = auth