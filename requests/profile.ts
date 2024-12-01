export async function getProfile() {
    const response = await fetch('http://localhost:3000/users/profile', {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const profile = await response.json();
    localStorage.setItem('profile', JSON.stringify(profile));
    return profile;
}
