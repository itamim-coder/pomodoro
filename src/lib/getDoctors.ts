const getDoctors = async () => {
    try {
        let response = await fetch('https://moyna-backend.vercel.app/api/v1/doctor', {
            cache: "no-store",
            next: { tags: ['doctor'] },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error('Failed to fetch doctors:', error);
        return [];
    }
};

export default getDoctors;