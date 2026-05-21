import { useState } from "react";
const token =  import.meta.env.VITE_GITHUB_TOKEN;
function Github_API(){

    const [username , setUsername] = useState('');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [profile, setProfile] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!username) return;
        setLoading(true);
        setError('');

        try{
            const response = await fetch(`https://api.github.com/users/${username}`,{
                 headers: {
                    Authorization: `Bearer ${token}`
                 }
                });
            if(!response.ok) throw new Error('User Not Found');
            const data = await response.json();
            setProfile(data);
        }catch (err){
            setError(err.message);
            setProfile(null);
        }finally{
            setLoading(false);
        }
    };
    return(
        <>
       <form onSubmit={handleSubmit}>
         <div className="main-container">
            <div>
                <h1>GitHub User Information</h1>
                <div>
                    <input type="text" placeholder="Enter the github username..." onChange={(e) => setUsername(e.target.value)} />
                    <button className="search-btn">Search</button>
                </div>
            </div>
        </div>
       </form>
       {(loading || profile || error) &&(
            <div className="info-container">
                { loading && <p className="messages" style={{ color:'white' ,fontSize: '2rem'}}>Loading... </p>}
                <br />
                {error &&  <p style={{color:'red', fontSize: '2rem'}} className="messages">Error: {error}⚠️</p> }
                {profile && 
                    <div>
                        <img src={profile.avatar_url}
                        alt={profile.name} /> <br />
                        <h2>{profile.name || profile.login}</h2>
                        <p>{profile.bio}</p>
                        <p> Total Repositories: {profile.public_repos}</p>
                        <p>Click Here:  <a href={profile.html_url}>Visit GitHub Profile</a> </p>
                    </div>}
                
            </div>
       )}
        </>
    );

}
export default Github_API;