
    const getCourseData = async (course) => {
        const promise = fetch("course/" + course, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.message) return res;
                throw Error(res.message);
            });

        try {
            const data = await toast.promise(promise, {
                loading: "جاري اضافة المادة...",
                success: "تم اضافة المادة",
                error: (err) => {
                    tagifyRef.current.removeTags();
                    return err.message;
                },
            });
            return data;
        } catch (error) {}
    };
