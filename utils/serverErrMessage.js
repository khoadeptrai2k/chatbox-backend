const ServerErrMessage = (action_type, res) => {
    return res.status(500).json({msg: `Waiting server response! action: ${action_type}`});
};

module.exports = ServerErrMessage;