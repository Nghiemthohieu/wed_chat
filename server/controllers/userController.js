const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) =>{
    const jwtkey= process.env.JWT_SELECT_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d" });
};

const regiseterUser = async(req, res) => {

    try{
        const {name, phoneNumber, password} = req.body;

        let user = await userModel.findOne({phoneNumber});
    
        if(user) 
            return res.status(400).json("Số điện thoại đã tồn tại...");
    
        if(!name || !phoneNumber || !password) 
            return res.status(400).json("Vui lòng điền thông tin...");
    
        if(!validator.isMobilePhone(phoneNumber))
            return res.status(400).json("Số điện thoại không hợp lệ...");
    
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Mật khẩu phải là một mật khẩu mạnh...");
    
        user  = new userModel({name, phoneNumber, password});
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save();
        
        const token = createToken(user._id);
    
        res.status(200).json({_id: user._id, name, phoneNumber, token});
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async(req, res) => {
    const {phoneNumber, password} = req.body

    try{
        console.log(phoneNumber);
        let user = await userModel.findOne({phoneNumber});

        if(!user) 
            return res.status(400).json("Invalid phoneNumber or password...");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword)
            return res.status(400).json("Invalid phoneNumber or password...");

        const token = createToken(user._id);
    
        res.status(200).json({_id: user._id, name: user.name, phoneNumber, token});
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) =>{
    const UserId = req.params.UserId;
    try{
        const user = await userModel.findById(UserId);

        res.status(200).json(user);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const getUsers = async(req, res) =>{
    try{
        const users = await userModel.find();

        res.status(200).json(users);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { regiseterUser, loginUser, findUser, getUsers};