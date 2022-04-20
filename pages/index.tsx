import React from "react";
import Head from 'next/head';

import { getFirestoreDataFromApiQuery, sortProjects } from "../lib/firebase";
import { 
  InstagramPostData, 
  InstagramProfileData, 
  PublicLinksData, 
  PublicProjectsData, 
  GithubProfileData, 
  GithubRepoData, 
  YouTubeProfileData,
  YouTubePostData
} from "../lib/types";
import { Github, Instagram, YouTube } from "../lib/socialMedia";

import styles from "./index.module.css";

import ProjectComponent from "../components/projectComponent/projectComponent";
import SocialMediaComponent from "../components/socialMediaComponent/socialMediaComponent";
import InstagramPostComponent from "../components/instagramPostComponent/instagramPostComponent";
import ProgressComponent from "../components/progressComponent/progressComponent";
import GithubRepoComponent from "../components/githubRepoComponent/githubRepoComponent";
import SimpleBar from "simplebar-react";


type HomeData = { 
  projectsData: PublicProjectsData,
  linksData: PublicLinksData,
  instagramData: InstagramPostData[],
  instagramProfileData: InstagramProfileData,
  githubProfileData: GithubProfileData,
  githubRepoData: GithubRepoData[],
  youtubeProfileData: YouTubeProfileData,
  youtubePostsData: YouTubePostData[]
}

class Home extends 
  React.Component<HomeData, {}> {

  constructor(props: HomeData) {
    super(props);
  }

  render() {
    //** This following line might work in development, but in production, secrets are only available to the node.js server */
    //console.log("testing environment variables: " + process.env.SECRET_API_KEY);

    // TODO: add icons to self-introduction

    return <>
      <Head>
        <title>TotallyInformatik</title>
      </Head>
      <ProgressComponent />
      <main> 
        <section className={styles.landingSection}>

          <div className={`${styles.landingName} transparent`}>
            <h1 className={`fancyHeading ${styles.fancyHeading} ${styles.transitionHeading}`}>TotallyInformatik</h1>
          </div>
          <div className={`${styles.landingChinese} transparent`}>
            <h1 className="chinese">目前正在编程</h1>
            <h1 className="chinese">目前正在学习</h1>
            <h1 className="chinese">目前正在改善</h1>
          </div>

          <article>
            <h1 className={`${styles.priorityHeading} standardHeading`}>Totally<br/>Informatik</h1>
            <p>Rui Zhang - 16 - Male - German</p>
            <p>Enthusiastic and Creative Student, Creator and Programmer.</p>
            <p>Established and Leads {"\""}Annette-Entwickelt-Software{"\""}.</p>
          </article>
          <img src="/images/logo.png" alt="logo / profile pic"/>
        </section>

        <section className={styles.projectsSection}>
          <small className={`${styles.line} ${styles.lineStart} chinese`}>
            我的创作
          </small>
          <h1 className={`${styles.line} ${styles.bannerVertical} chinese`}>
            我的创作
          </h1>
          <div className={`${styles.line} ${styles.lineVertical}`} />
          <aside className={styles.headingAside}>
            <h1 className={`fancyHeading ${styles.fancyHeading} ${styles.transitionHeading}`}>My Work</h1>
          </aside>
          <section className={styles.projectListSection}>
            <article>
              <h2 className="standardHeading">Projects</h2>
              <p>Publicly Available Applications and Websites.</p>
              <p>Built with Passion and Care.</p>
            </article>
            {
              sortProjects(this.props.projectsData).map(
                (value) => {
                  return <ProjectComponent key={value.title} data={value} />
                }
              )
            }
          </section>
          <small className={`${styles.line} ${styles.lineEnd}`}>我的创作</small>
        </section>

        <section className={styles.socialMediaSection}>
          <h1 className={`fancyHeading ${styles.fancyHeading} ${styles.transitionHeading}`}>Social Media</h1>
          <h1 className={`${styles.chinese} chinese`}>网络媒体</h1>

          <h2 className="standardHeading">Follow Me</h2>
          <article>
            <p>My Social Media Accounts go into Detail About My Work.</p>
            <p>Explanations, Code Details, Valuable Lessons, etc.</p>
          </article>

          <SocialMediaComponent 
            className={styles.github}
            title="Github"
            socialMediaLink={this.props.githubProfileData.html_url}
            profileInformation={
              <>
                <b>
                  <a href={this.props.githubProfileData.html_url}>
                    {this.props.githubProfileData.login}
                  </a>
                </b>
                <p>{this.props.githubProfileData.bio}</p>
                <p>{this.props.githubProfileData.public_repos} Public Repos</p>
              </>
            }
          >
            <SimpleBar autoHide={true} className={styles.simplebar} >
              {
                this.props.githubRepoData.map(
                  (value) => {
                    return <GithubRepoComponent 
                      key={value.name}
                      title={value.name}
                      description={value.description}
                      language={value.language}
                      updated_at={value.updated_at}
                      html_url={value.html_url}
                    />
                  }
                )
              }
            </SimpleBar>
          </SocialMediaComponent>

          <SocialMediaComponent 
            className={styles.instagram}
            title="Instagram"
            socialMediaLink={this.props.linksData.instagram}
            profileInformation={
              <>
                <b><a href={this.props.linksData.instagram}>{this.props.instagramProfileData.username}</a></b>
                <p>16, Student | Passion: Math, Computer Science, Physics | Student prez at Annette Grammar | Leader of the Annette-Entwickelt-Software Group</p>
                <p>{this.props.instagramProfileData.media_count} Posts</p>
              </>
            }
          >
            {
              this.props.instagramData.map(
                (value) => {
                  return <InstagramPostComponent 
                    key={value.id}
                    postData={value}
                    profileData={this.props.instagramProfileData}
                  /> 
                }
              )
            }
          </SocialMediaComponent>

          <SocialMediaComponent
            className={styles.youtube}
            title="YouTube"
            socialMediaLink={this.props.linksData.youtube}
            profileInformation={
              <>
                <b><a href={this.props.linksData.youtube}>
                {this.props.youtubeProfileData.brandingSettings.channel.title}
                </a></b>
                <p>
                  {this.props.youtubeProfileData.brandingSettings.channel.description}
                </p>
                <p>
                  {this.props.youtubeProfileData.statistics.videoCount} Videos
                </p>
              </>
            }
          >
            {
              this.props.youtubePostsData.map((value) => {
                console.log(value.id.videoId);
                return <iframe 
                  key={value.id.videoId}
                  width="560" 
                  height="315" 
                  src={`https://www.youtube.com/embed/${value.id.videoId}?`}  
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>;
              })
            }
          </SocialMediaComponent>

        </section>

        <section>
          <h1 className="fancyHeading">Contact</h1>
          <h1 className="chinese">联系</h1>
          <h2>Have a Project?</h2>
          <p>Let me handle it.</p>
          <ul>
            <li>No Rules</li>
            <li>No Licenses</li>
            <li>No Payment</li>
            <li>Just what you want</li>
          </ul>
          <form action="POST">
            
          </form>
        </section>

      </main>
    </>;
  }

}

export default Home

export async function getStaticProps() {
 
  //* Note that a change in Environment Variables requires a full restart of the development server

  //* NOTE that you should not fetch from your own api in a server-side function such as getStaticProps. 
  //* Just use the functions you've written, it will be exaclty as safe, since this runs on the server-side 

  const projectsData = await getFirestoreDataFromApiQuery(["public", "projects"]) as PublicProjectsData;
  const linksData = await getFirestoreDataFromApiQuery(["public", "links"]) as PublicLinksData;

  const instagramData = await Instagram.getMostRecentPosts() as InstagramPostData[];
  const instagramProfileData = await Instagram.getUserProfile() as InstagramProfileData;

  const githubProfileData = await Github.getUserProfile() as GithubProfileData;
  const githubRepoData = await Github.getRepositories() as GithubRepoData[];

  const youtubeProfileData = (await YouTube.getUserProfile()).items[0] as YouTubeProfileData;
  const youtubePostsData = (await YouTube.getMostRecentPosts()).items as YouTubePostData[];

  console.log(youtubePostsData);

  return {
    props: {
      projectsData: projectsData,
      linksData: linksData,
      instagramData: instagramData,
      instagramProfileData: instagramProfileData,
      githubProfileData: githubProfileData,
      githubRepoData: githubRepoData,
      youtubeProfileData: youtubeProfileData,
      youtubePostsData: youtubePostsData
    }
  };
  
} 
