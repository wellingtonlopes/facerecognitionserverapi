const handleProfileGet = async (req, res, knex) => {
    const { id } = req.params;
    try {
        const user = await knex.select('*').from('users').where('id', id);
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('Not found');
        }
    } catch (error) {
        res.status(400).json('Error getting user');
    }
}

module.exports = {
    handleProfileGet: handleProfileGet
}