import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SurveyForm() {
  const [snsPlatforms, setSnsPlatforms] = useState([]);
  const [otherSnsValue, setOtherSnsValue] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (snsPlatforms.length === 0) {
      alert('Please select at least one SNS platform you use.');
      return;
    }
  
    const formData = new FormData(event.target);
  
    if (otherSnsValue) {
      formData.append('otherSnsValue', otherSnsValue);
    }
  
    const actionUrl = event.target.action;
    const method = event.target.method;
  
    fetch(actionUrl, {
      method: method,
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/success');
        } else {
          alert('Failed to submit survey.');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the survey.');
      });
  };
  

  const handleSnsPlatformChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSnsPlatforms((prevPlatforms) => [...prevPlatforms, value]);
      if (value === 'Other') {
        setShowOtherInput(true);
      }
    } else {
      setSnsPlatforms((prevPlatforms) =>
        prevPlatforms.filter((platform) => platform !== value)
      );
      if (value === 'Other') {
        setShowOtherInput(false);
        setOtherSnsValue('');
      }
    }
  };

  return (
    <div className="container">
      <h1>Survey on SNS Usage Among Korean University Students</h1>
      <form
        id="snsSurveyForm"
        action="http://localhost:4000/success"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="survey-question">
          <label htmlFor="age">
            Age <span className="required">*</span>
          </label>
          <input type="number" id="age" name="age" min="17" max="100" required />
        </div>

        <div className="survey-question">
          <label htmlFor="gender">
            Gender <span className="required">*</span>
          </label>
          <select id="gender" name="gender" required>
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="survey-question">
          <label htmlFor="university">
            University <span className="required">*</span>
          </label>
          <input type="text" id="university" name="university" required />
        </div>

        <div className="survey-question">
          <label htmlFor="year">
            Year of Study <span className="required">*</span>
          </label>
          <select id="year" name="year" required>
            <option value="">--Select--</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5+">5th Year or above</option>
          </select>
        </div>

        <div className="survey-question">
          <label htmlFor="time">
            How often do you use SNS in a day? <span className="required">*</span>
          </label>
          <input
            type="number"
            id="time"
            name="time"
            min="0"
            max="24"
            step="0.5"
            required
          />
        </div>

        <div className="survey-question">
          <label>
            Which SNS platforms do you use regularly?{' '}
            <span className="required">*</span>
          </label>
          <br />
          <br />
          <input
            type="checkbox"
            id="facebook"
            name="snsPlatforms"
            value="Facebook"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="facebook">Facebook</label>

          <input
            type="checkbox"
            id="instagram"
            name="snsPlatforms"
            value="Instagram"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="instagram">Instagram</label>

          <input
            type="checkbox"
            id="twitter"
            name="snsPlatforms"
            value="Twitter"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="twitter">Twitter</label>

          <input
            type="checkbox"
            id="thread"
            name="snsPlatforms"
            value="Thread"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="thread">Thread</label>

          <input
            type="checkbox"
            id="linkedin"
            name="snsPlatforms"
            value="Linkedin"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="linkedin">Linkedin</label>

          <input
            type="checkbox"
            id="otherSns"
            name="snsPlatforms"
            value="Other"
            onChange={handleSnsPlatformChange}
          />
          <label htmlFor="otherSns">Other</label>
        </div>

        {showOtherInput && (
          <div className="survey-question">
            <label htmlFor="otherSnsValue">
              Please specify other SNS platforms you use:
            </label>
            <input
              type="text"
              id="otherSnsValue"
              name="otherSnsValue"
              value={otherSnsValue}
              onChange={(e) => setOtherSnsValue(e.target.value)}
              required
            />
          </div>
        )}

        <div className="survey-question">
          <label htmlFor="snsPurpose">
            Primary purpose of using SNS <span className="required">*</span>
          </label>
          <select id="snsPurpose" name="snsPurpose" required>
            <option value="">--Select--</option>
            <option value="Socializing with friends">
              Socializing with friends
            </option>
            <option value="Networking for academic purposes">
              Networking for academic purposes
            </option>
            <option value="Entertainment">Entertainment</option>
            <option value="News and information">News and information</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="survey-question">
          <label htmlFor="timeSpent">
            Average time spent on SNS per day (in hours){' '}
            <span className="required">*</span>
          </label>
          <input
            type="number"
            id="timeSpent"
            name="timeSpent"
            min="1"
            step="1"
            required
          />
        </div>

        <div className="survey-question">
          <label htmlFor="impact">
            Do you think SNS usage affects your academic performance?{' '}
            <span className="required">*</span>
          </label>
          <select id="impact" name="impact" required>
            <option value="">--Select--</option>
            <option value="Positive impact">Positive impact</option>
            <option value="Negative impact">Negative impact</option>
            <option value="No impact">No impact</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>

        <div className="survey-question">
          <label htmlFor="privacyConcern">
            How concerned are you about privacy on SNS?{' '}
            <span className="required">*</span>
          </label>
          <select id="privacyConcern" name="privacyConcern" required>
            <option value="">--Select--</option>
            <option value="Very concerned">Very concerned</option>
            <option value="Somewhat concerned">Somewhat concerned</option>
            <option value="Neutral">Neutral</option>
            <option value="Not concerned">Not concerned</option>
          </select>
        </div>

        <div className="survey-question">
          <label htmlFor="additionalComments">
            Additional comments or suggestions:
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            rows="4"
            placeholder="Enter your comments here..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Survey
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;
