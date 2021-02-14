export const imageUpload = async (images) => {
    let imagesArray = []
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET)
        formData.append("cloud_name", process.env.CLOUD_NAME)

        const response = await fetch(process.env.CLOUD_API, {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        imagesArray.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imagesArray
}
