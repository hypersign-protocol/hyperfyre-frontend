export default {
    methods: {
        getTokenIcon(name) {
            return "https://api.dicebear.com/5.x/initials/svg?seed="+name+"&backgroundColor=43a047"
        }
    },
};