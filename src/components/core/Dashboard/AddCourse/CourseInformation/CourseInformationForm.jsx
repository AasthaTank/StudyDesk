import { React,useState , useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';


const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state)=> state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([ ]);

    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instruction);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    const onSubmit = async(data) => {

    }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >

        <div>
            <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle",{require:true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is required**</span>
                )
            }

        </div>

        <div>
            <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className='min-h-[140px] w-full'
            />
            {
                errors.courseShortDesc && (
                    <span>Course Description is required**</span>
                )
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true,
                    })}
                className=' w-full'
            />
            <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
            {
                errors.coursePrice && (
                    <span>Course Price is required**</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required:true})}
            >

                <option value="" disabled> Choose a Category</option>
                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index}value={category?._id} >
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <spam>
                        Course Cateogry is required
                    </spam>
                )
            }
        </div>


        {/* create a custom component for handling tags input */}
        {/* <CHipInput
            label='Tags'
            name='courseTags'
            placeholder='enter tags and press enter'
            register={register}
            ..
        /> */}

        {/* create a component for uploading and showing preview of media */}

        {/* <Upload
            name=''
            label=''
            register={}
            errors=
            setValue=
        /> */}

        {/* Benefits of the Course */}
        
        <div>
            <label>Benefits of the course<sup>*</sup></label>
            <textarea
                id='coursebenefits'
                placeholder='Enter Benefits of the course'
                {...register("courseBenefits", {required:true})}
                className='min-h-[130px] w-full'
            />
            {
                errors.courseBenefits && (
                    <span>Benefits of the course are required**</span>
                )
            }
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValue={getValue}
        />
      
    </form>
  )
}

export default CourseInformationForm
