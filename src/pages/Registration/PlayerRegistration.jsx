import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterPlayerMutation } from "../../api/authApi";

function PlayerRegistration(){
    const navigate = useNavigate();

    const [registrationNo, setRegistrationNo] = useState("");
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [studyingClass, setStudyingClass] = useState("");
    const [institution, setInstitution] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    const [religion, setReligion] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [tournament, setTournament] = useState("");
    const [team, setTeam] = useState("");
    const [position, setPosition] = useState("");
    const [photo, setPhoto] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setPhoto(file);
        }
    };


    const [registerPlayer, {isSuccess, isError}] = useRegisterPlayerMutation();


    const createHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("registrationNo", registrationNo);
        formData.append("name", name);
        formData.append("fatherName", fatherName);
        formData.append("motherName", motherName);
        formData.append("studyingClass", studyingClass);
        formData.append("institution", institution);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("age", age);
        formData.append("religion", religion);
        formData.append("bloodGroup", bloodGroup);
        formData.append("address", address);
        formData.append("district", district);
        formData.append("tournament", tournament);
        formData.append("team", team);
        formData.append("position", position);
        formData.append("photo", photo);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);

        await registerPlayer(formData);
    };

    useEffect(() => {
        if(isSuccess){
            <div className="toast">
                <div className="alert alert-info">
                    <span>Registration Successful</span>
                </div>
            </div>
            navigate("/");
        }else{
            <div className="toast">
                <div className="alert alert-danger">
                    <span>Registration Failed</span>
                </div>
            </div>
        }
    }, [isSuccess, isError]);


    


    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-blod">Player Registration Form</h1>
                <div className="w-full flex flex-col justify-center items-center p-5">
                    <form onSubmit={(e) => createHandler(e)}>
                        <div className="mb-5">
                            <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">Registration No</label>
                            <input type="text" value={registrationNo} placeholder="Registration no..." className="input w-[600px]" onChange={(e) => setRegistrationNo(e.target.value)} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="fathersname" className="block text-sm font-medium text-gray-700">Father's Name</label>
                            <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} type="text" placeholder="Father's name..." className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="mothersname" className="block text-sm font-medium text-gray-700">Mother's Name</label>
                            <input value={motherName} onChange={(e) => setMotherName(e.target.value)} type="text" placeholder="Mother's name" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                            <input value={studyingClass} onChange={(e) => setStudyingClass(e.target.value)} type="text" placeholder="class" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                            <input value={institution} onChange={(e) => setInstitution(e.target.value)} type="text" placeholder="Institution" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of birth</label>
                            <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" placeholder="" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Age" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="religion" className="block text-sm font-medium text-gray-700">Religion</label>
                            <input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Religion" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="bloodgroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                            <input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} type="text" placeholder="Blood Group" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                            <input value={district} onChange={(e) => setDistrict(e.target.value)} type="text" placeholder="District" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="tournament" className="block text-sm font-medium text-gray-700">Tournament</label>
                            <input value={tournament} onChange={(e) => setTournament(e.target.value)} type="text" placeholder="Tournament" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
                            <input value={team} onChange={(e) => setTeam(e.target.value)} type="text" placeholder="Team" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                            <input value={position} onChange={(e) => setPosition(e.target.value)} type="text" placeholder="Position" className="input w-[600px]" />
                        </div>

                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                            <input onChange={onChangeHandler} type="file" placeholder="Put your photo in a drive and put the link here..." className="input w-[600px]" />
                        </div>


                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="mail@site.com" required/>
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone number" className="input w-[600px]" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>

                        <div className="mb-5">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlayerRegistration;