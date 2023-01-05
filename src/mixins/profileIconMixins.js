export default {
    methods: {
        getProfileIcon(name) {
            return "https://avatars.dicebear.com/api/identicon/"+name+".svg"
        },
        getTokenIcon(name) {
            return `https://avatars.dicebear.com/api/initials/:${name}.svg`
        }
    },
};