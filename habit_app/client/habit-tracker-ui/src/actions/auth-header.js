export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    if (user && user.access_token) {
        console.log()
        return {Authorization: 'Bearer '+user.access_token};
    } else {
        return {};
    }
};