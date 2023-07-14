import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import '../styles/getstarted.css'

const GetStarted = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const auth = useAuth();
  const currentUser = auth.currentUser;

  const handleSaveData = async () => {
    if (!currentUser) return;

    try {
      const { email, displayName } = currentUser; // Retrieve email and name from currentUser object

      const userDataRef = doc(collection(db, 'userData'), currentUser.uid);
      const userDataSnapshot = await getDoc(userDataRef);

      if (userDataSnapshot.exists()) {
        // Document exists, update the data
        await updateDoc(userDataRef, {
          email,
          name: displayName,
          weight,
          height,
          gender,
        });
      } else {
        // Document doesn't exist, create a new one
        await setDoc(userDataRef, {
          email,
          name: displayName,
          weight,
          height,
          gender,
        });
      }

      console.log('Data saved successfully.');
      navigate("/dashboard");
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <section className='BMI'>
      <Container>
        <Row className='center'>
          <Col lg='6'>
            <div className='middle'>
              <h5>Kickstart Your Fitness Goals..Take the First Step</h5>
              <h5 className='wt'>Enter your weight</h5>
              <div className='input-group'>
                
                <input
                  type='number'
                  id='weight'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <h5 className='wt'>Enter your Height</h5>
              <div className='input-group'>
                <input
                  type='number'
                  id='height'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <h5 className='wt'>Select your Gender</h5>
              <div className='input-group'>
                
                <select
                  id='gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option >Select</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div >
              <div className='left'><button className='buy__button ' onClick={handleSaveData}>Get Started...</button></div>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GetStarted;
