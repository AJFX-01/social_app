import './stories.scss';
import Photo from '../../assets/picc.jpeg' 
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Stories = () => {

    const {currentUser} = useContext(AuthContext);

    // Temporary dummy data
    const stories = [
        {
            id: 1,
            name: 'Jamie Hayter',
            img: Photo 
        },

        {
            id: 2,
            name: 'Jamie Hayter',
            img: Photo 
        },

        {
            id: 3,
            name: 'Jamie Hayter',
            img: Photo 
        },

        {
            id: 4,
            name: 'Jamie Hayter',
            img: Photo 
        }
    ];
    return (
        <div className="stories">
             <div className='story'>
                    <img src={currentUser.profilePic} />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
            {stories.map(story => 
                <div className='story' key={story.id}>
                    <img src={story.img} />
                    <span>{story.name}</span>
                </div>
            )}
        </div>
    )
}

export default Stories