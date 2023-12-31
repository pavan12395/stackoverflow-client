import React, {useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { setSkills } from '../redux/actions';
import { difficultyOptions, EMPTY_STRING,} from '../Constants/constants';
import { setAvailableSkillOptions } from '../redux/actions';
import { setNewSkillName } from '../redux/actions';
import { setNewSkillDifficulty } from '../redux/actions';
/*
State specific to present 
*/
const Skills = () => {
  const skills = useSelector((state)=>(state.skills));
  const dispatch = useDispatch();
  const newSkill = useSelector((state)=>state.newSkillName)
  const newDifficulty = useSelector((state)=>state.newSkillDifficulty);
  const availableSkillOptions = useSelector((state)=>state.availableSkillOptions);
  useEffect(()=>
  {
    return ()=>
    {
       dispatch(setSkills([]));
       dispatch(setNewSkillName(''));
       dispatch(setNewSkillDifficulty(''));
    }
  },[]);  
  useEffect(() => {
    const selectedSkills = skills.map((skill) => skill.name);
    const updatedOptions = availableSkillOptions.filter(
      (option) => !selectedSkills.includes(option)
    );
    dispatch(setAvailableSkillOptions(updatedOptions))
  }, [skills]);

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill && newDifficulty) {
      const skill = { name: newSkill, difficulty: newDifficulty };
      dispatch(setSkills([...skills, skill]));
      dispatch(setNewSkillName(EMPTY_STRING));
      dispatch(setNewSkillDifficulty(EMPTY_STRING));
    }
  };


  return (
    <div className="skills-container">
      <h2>Skills</h2>
      <div className="skill-form">
        <select
          value={newSkill}
          onChange={(e) => dispatch(setNewSkillName(e.target.value))}
        >
          <option value="">Select Skill</option>
          {availableSkillOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={newDifficulty}
          onChange={(e) => dispatch(setNewSkillDifficulty(e.target.value))}
        >
          <option value="">Select Difficulty</option>
          {difficultyOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={addSkill}>Add Skill</button>
      </div>
      <ul className="skill-list">
        {skills.map((skill, index) => (
          <li key={index}>
            {skill.name} (Difficulty: {skill.difficulty})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
