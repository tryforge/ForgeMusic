module.exports = {
    name: "eval",
    type: "messageCreate",
    code: "$onlyIf[$authorId==$botOwnerID;No]$eval[$message]"
}