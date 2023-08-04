import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepository()
  }

  onClickTabItem = id => {
    this.setState({activeFilterId: id}, this.getRepository)
  }

  getRepository = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeFilterId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLanguageFilterItem = () => {
    const {activeFilterId} = this.state
    return (
      <div className="language-filter-items-container">
        <ul className="language-filter-items">
          {languageFiltersData.map(eachLangItem => (
            <LanguageFilterItem
              key={eachLangItem.id}
              eachLanguage={eachLangItem}
              isActive={activeFilterId === eachLangItem.id}
              onClickTabItem={this.onClickTabItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-main-container">
        <h1 className="app-heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
