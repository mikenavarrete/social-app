const {Schema, model} = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const user = new Schema({
    username: {
        type: string,
        unique: true, 
        required: true,
        trim: true
    },
    email: {
        type: string,
        required: true, 
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true
}
}
)

user.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', user);
module.exports = User;
