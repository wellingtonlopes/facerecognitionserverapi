const handleSignin = async (req, res, knex, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json('Incomplete form submission');
    }
    try {
        const data = await knex.select('email', 'hash').from('login').where('email', '=', email);
    
        await bcrypt.compare(password, data[0].hash, async function(err, result) {
            if (result) {
                try {
                    const user = await knex.select('*').from('users').where('email', '=', email);
                    res.json(user[0]);
                } catch (err) {
                    res.status(400).json('Unable to get user')
                }
            } else {
                res.status(400).json('Wrong credentials')
            }
        });
    } catch (error) {
        res.status(400).json('Wrong credentials')
    }
};

module.exports = {
    hangleSignin: handleSignin
}