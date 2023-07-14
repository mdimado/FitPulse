import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { toast } from 'react-toastify';
import file from '../python/file.json'
import stepsJson from '../python/steps.json'
import '../styles/dashboard.css';
import CircularProgressBar from './CircularProgressBar';
import Graph from './Graph';
import CalorieBar from './CalorieBar';
import KmBar from './KmBar';

const firebaseConfig = {
    apiKey: "AIzaSyACp7cqgnwoU22Z7ydVRmXcFYWUfAN0cYA",
    authDomain: "fitpulse-8e00f.firebaseapp.com",
    projectId: "fitpulse-8e00f",
    storageBucket: "fitpulse-8e00f.appspot.com",
    messagingSenderId: "701292956926",
    appId: "1:701292956926:web:0768fc957f7bd2c8b829af"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const stepsWalkedList = Object.values(stepsJson);
const timeList = Object.keys(stepsJson);
const steps = stepsWalkedList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const calories = (file.calories_burnt).toFixed(2);
const km = (steps / 1500.123).toFixed(2);

const Dashboard = () => {
  const [goal, setGoal] = useState({
    selectedGoal: '',
    startDate: '',
    endDate: '',
  });

  const [userGoals, setUserGoals] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

 
  

  const handleGoalSelection = (e) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      selectedGoal: e.target.value,
    }));
  };

  const handleStartDateSelection = (e) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      startDate: e.target.value,
    }));
  };

  const handleEndDateSelection = (e) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      endDate: e.target.value,
    }));
  };

  const handleGoalSetting = async () => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
      const goalsRef = firestore.collection('userData').doc(user.uid).collection('goals');
      const newGoalRef = goalsRef.doc(); 

      await newGoalRef.set({
        selectedGoal: goal.selectedGoal,
        startDate: goal.startDate,
        endDate: goal.endDate,
      });

      console.log('Goal stored in Firestore successfully');
      toast.success('Goal Set Successfully');
    } catch (error) {
      console.error('Error storing goal in Firestore:', error);
      toast.error('Error setting goal');
    }
  };

  useEffect(() => {
    const fetchUserGoals = async () => {
      const user = firebase.auth().currentUser;
      if (!user) return;

      try {
        const goalsRef = firestore.collection('userData').doc(user.uid).collection('goals');
        const goalsSnapshot = await goalsRef.get();

        const userGoalsData = goalsSnapshot.docs.map((doc) => ({
          goalId: doc.id, // Add the goalId property
          ...doc.data(),
        }));

        setUserGoals(userGoalsData);
      } catch (error) {
        console.error('Error fetching user goals:', error);
      }
    };

    fetchUserGoals();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (!user) return;

      try {
        const userDataRef = firestore.collection('userData').doc(user.uid);
        const userDataSnapshot = await userDataRef.get();

        if (userDataSnapshot.exists) {
          const userData = userDataSnapshot.data();
          setHeight(userData.height);
          setWeight(userData.weight);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleGoalCompleted = async (goalId) => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
      const goalRef = firestore.collection('userData').doc(user.uid).collection('goals').doc(goalId);
      await goalRef.delete();

      console.log('Goal deleted from Firestore successfully');
      toast.success('Goal Completed');

      // Remove the deleted goal from the state
      setUserGoals((prevGoals) => prevGoals.filter((goal) => goal.goalId !== goalId));
    } catch (error) {
      console.error('Error deleting goal from Firestore:', error);
      toast.error('Error completing goal');
    }
  };

  return (
    <section className="services">
      <Container>
        <Row>
          <Col lg="7">
            <Col lg="12" className="dis">
              <Col lg="5">
                <motion.div whileHover={{ scale: 1.1 }} className="service__item">
                  <span>
                    <i className="ri-walk-line"></i>
                  </span>
                  <div>
                    <h3>{steps}</h3>
                    <h3>Steps</h3>
                  </div>
                </motion.div>
              </Col>
              <Col lg="5">
                <motion.div whileHover={{ scale: 1.1 }} className="service__item2">
                  <span>
                    <i className="ri-fire-line"></i>
                  </span>
                  <div>
                    <h3>{calories}</h3>
                    <h3>Calories</h3>
                  </div>
                </motion.div>
              </Col>
            </Col>

            <Col lg="12" className="dis">
              <Col lg="5">
                <motion.div whileHover={{ scale: 1.1 }} className="service__item3">
                  <span>
                    <i className="ri-heart-pulse-line"></i>
                  </span>
                  <div>
                    <h3>91 bpm</h3>
                  </div>
                </motion.div>
              </Col>
              <Col lg="5">
                <motion.div whileHover={{ scale: 1.1 }} className="service__item4">
                  <span>
                    <i className="ri-pin-distance-line"></i>
                  </span>
                  <div>
                    <h3>{km} km</h3>
                  </div>
                </motion.div>
              </Col>
            </Col>

            <h1 className="top">Find your activity</h1>
            <Row>
              <Col lg="3" className="bla blaa">
                <h4>Yoga</h4>
                <div className="dfff">
                  <i className="ri-time-line"></i>
                  <h6>60 minutes</h6>
                </div>
                <div className="dfff">
                  <i className="ri-fire-line"></i>
                  <h6>210 kcal/h</h6>
                </div>
                <button className="button-1" role="button">
                  Try now
                </button>
              </Col>
              <Col lg="3" className="bla blaa">
                <h4>Cardio</h4>
                <div className="dfff">
                  <i className="ri-time-line"></i>
                  <h6>60 minutes</h6>
                </div>
                <div className="dfff">
                  <i className="ri-fire-line"></i>
                  <h6>430 kcal/h</h6>
                </div>
                <button className="button-1" role="button">
                  Try now
                </button>
              </Col>
              <Col lg="3" className="bla blaa">
                <h4>Workout</h4>
                <div className="dfff">
                  <i className="ri-time-line"></i>
                  <h6>60 minutes</h6>
                </div>
                <div className="dfff">
                  <i className="ri-fire-line"></i>
                  <h6>600 kcal/h</h6>
                </div>
                <button className="button-1" role="button">
                  Try now
                </button>
              </Col>
            </Row>

            <h1 className="top">Set a Goal</h1>
            <Row>
              <Col lg="10" className="bla blaa blaaa">
                
                <div>
                  <label htmlFor="selectedGoal">Choose a Goal: </label>
                  <select id="selectedGoal" onChange={handleGoalSelection} value={goal.selectedGoal}>
                    <option value="">Select a goal</option>
                    <option value="Lose weight">Lose weight</option>
                    <option value="Build muscle">Build muscle</option>
                    <option value="Improve cardiovascular endurance">Improve cardiovascular endurance</option>
                    <option value="Increase flexibility">Increase flexibility</option>
                    <option value="Enhance core strength">Enhance core strength</option>
                    <option value="Improve balance and coordination">Improve balance and coordination</option>
                    <option value="Boost athletic performance">Boost athletic performance</option>
                    <option value="Reduce body fat percentage">Reduce body fat percentage</option>
                    <option value="Increase overall strength">Increase overall strength</option>
                    <option value="Complete a specific fitness challenge or event">
                      Complete a specific fitness challenge or event
                    </option>
                    <option value="Improve mental well-being">Improve mental well-being</option>
                    <option value="Develop a consistent exercise routine">Develop a consistent exercise routine</option>
                    <option value="Increase energy levels">Increase energy levels</option>
                    <option value="Maintain overall health and well-being">Maintain overall health and well-being</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="startDate">Start Date: </label>
                  <input type="date" id="startDate" onChange={handleStartDateSelection} value={goal.startDate} />
                </div>
                <div>
                  <label htmlFor="endDate">End Date: </label>
                  <input type="date" id="endDate" onChange={handleEndDateSelection} value={goal.endDate} />
                </div>
                <button className="button-1" role="button" onClick={handleGoalSetting}>
                  Set a goal
                </button>
              </Col>
            </Row>
            <Row><Col  lg='10'  className="bla blaa blaaa">
                <h5>Your BODY-MASS-INDEX</h5>
                <h5>Your BMI: {bmi}</h5>
                    <h5>Category: You are Normal </h5>

            </Col></Row>
            
          </Col>

          <Col lg="5" className="bla">
            <Col lg="12" className="dff">
              <Col lg="4">
                <CircularProgressBar steps={steps} />
                <h5 className="text-center">Steps</h5>
              </Col>
              <Col lg="4">
                <KmBar km={km} />
                <h5 className="text-center">Distance</h5>
              </Col>
              <Col lg="4">
                <CalorieBar caloriesBurnt={calories} />
                <h5 className="text-center">Calories</h5>
              </Col>
            </Col>

            <Col lg="12">
              <Graph stepsWalkedList={stepsWalkedList} timeList={timeList} />
            </Col>

            <Col lg="12">
              <h2>Your Goals:</h2>
              {userGoals.length > 0 ? (
                <ul>
                  {userGoals.map((goal) => {
                    const colors = ['#E6DFF1', '#C0DEDD', '#F1DFDE', '#dfc5db'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    return (
                      <li key={goal.goalId}>
                        <div className="whi" style={{ backgroundColor: randomColor }}>
                          <p>Goal: {goal.selectedGoal}</p>
                          <div className="dff">
                            <p>Start Date: {goal.startDate}</p>
                            <p>End Date: {goal.endDate}</p>
                          </div>
                          <button
                            className="button-1"
                            role="button"
                            onClick={() => handleGoalCompleted(goal.goalId)}
                          >
                            Goal Completed
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No goals set <h5>Achieve the extraordinary by setting a clear and compelling goal.</h5></p>
              )}
            </Col>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
