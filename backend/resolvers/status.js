const pool = require("../db");

const StatusQuery = {
    statuses: async (_, __, contextValue) => {
        try {
            if (contextValue.user.role !== 'guest') {
                const result = await pool.query(`SELECT * FROM status`);
                return result.rows;
            }
            return [];
        } catch (error){
            return { message: error.message };
        }
    }
}

module.exports = {
    StatusQuery
}