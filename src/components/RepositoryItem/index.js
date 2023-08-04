// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, starsCount, issuesCount, forksCount} = repoDetails

  return (
    <li className="each-repo-item">
      <div className="each-repo-card">
        <img src={avatarUrl} className="avatar-image" alt={name} />
        <h1 className="name">{name}</h1>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="start-icon"
          />
          <p className="stars-count">{starsCount}</p>
          <p className="stars-name">stars</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="start-icon"
          />
          <p className="stars-count">{forksCount}</p>
          <p className="stars-name">forks</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="start-icon"
          />
          <p className="stars-count">{issuesCount}</p>
          <p className="stars-name">issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
