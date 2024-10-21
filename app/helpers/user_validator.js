const yup = require('yup');

module.exports.userRegisterSchema = yup.object({
    body: yup.object({
        user_name: yup.string().required('please enter username'),
        email: yup.string().email('Please enter a valid email').required('Please enter your email'),
        password: yup.string().min(6, 'Password must have at least 6 characters').required('Please enter a password')
    })
})

module.exports.userLoginSchema = yup.object({
    body: yup.object({
        email: yup.string().email('Please enter a valid email').required('Please enter your registered email'),
        password: yup.string().required('Please enter your password')
    })
})

module.exports.userValidator = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body
        });
        next();
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}