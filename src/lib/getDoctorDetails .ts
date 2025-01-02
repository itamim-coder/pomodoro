const getDoctorDetails = async (id: string) => {
    // Check if data is already in localStorage
    const storedDoctorDetails = localStorage.getItem(`${id}`);

    // If doctor details are found in localStorage, return them
    if (storedDoctorDetails) {
        return JSON.parse(storedDoctorDetails);
    }

    // If not in localStorage, fetch from the server
    try {
        let response = await fetch(`https://moyna-backend.vercel.app/api/v1/doctor/${id}`, {
            cache: "default",
            next: { tags: ['doctorDetails'] },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        // Save the fetched data to localStorage for future use
        localStorage.setItem(`${id}`, JSON.stringify(data?.data));

        // Return the fetched doctor details
        return data?.data || null;
    } catch (error) {
        console.error('Failed to fetch doctor details:', error);
        return null;
    }
};

export default getDoctorDetails;