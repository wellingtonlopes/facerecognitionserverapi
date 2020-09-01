const saltRounds = 10;
const handleRegister = (req, res, knex, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incomplete form submission');
    }
    
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        try {
            await knex.transaction(async trx => {
                const loginEmail = await trx('login')
                .insert({
                    hash: hash,
                    email: email
                })
                .returning('email');
                try {
                    const user = await trx('users')
                    .insert({
                        email:loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .returning('*');
                    res.json(user[0]);
                    trx.commit;
                } catch (error) {
                    trx.rollback;
                }
            })
        } catch (error) {
            res.status(400).json(error);
        }
    });
};

module.exports = {
    handleRegister: handleRegister
}