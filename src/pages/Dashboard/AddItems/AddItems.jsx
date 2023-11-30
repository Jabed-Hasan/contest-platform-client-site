import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                details: data.details,
                prizeMoney: data.prizeMoney,
                taskSubmissionText:data.taskSubmissionText,
                ContestDeadline:data.ContestDeadline,
                

                image: res.data.data.display_url

            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };

    return (
        <div>
            <SectionTitle heading="add a contest" subHeading="What's new?" ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Contest Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Contest Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="Buisness">Buisness</option>
                                <option value="Medical">Medical</option>
                                <option value="Article">Article</option>
                                <option value="Gaming">Gaming</option>
                                <option value="WebApp">WebApp</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                          {/* price */}
                          <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price Money*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price Money"
                                {...register('prizeMoney', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text">Contest Deadline*</span>
                </label>
                <input
                    type="date"
                    {...register('ContestDeadline', { required: true })}
                    className="input input-bordered w-full"
                    onInput={handleSubmit(onSubmit)}
                />
            </div>

                    </div>
                    {/* details details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Details</span>
                        </label>
                        <textarea {...register('details')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Submissions</span>
                        </label>
                        <textarea {...register('taskSubmissionText')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Contest <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;