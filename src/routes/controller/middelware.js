import HelperMethod from "../../utils/helper";

export const adminJwtVerify = async (req, res, next)=>{
    try {
        const token = req.get("authorization");
        const isValid = await HelperMethod.verifyAdminJwt(token);
        if(isValid){
            next()
        }else{
            res.status(200).json({
                status: 403,
                message: "Unauthorized user"
            })  
        }
    } catch (error) {
        res.status(200).json({
            status: 500,
            message: "INTERNAL_SERVER_ERROR"
        })
    }
}