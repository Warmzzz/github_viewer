import styles from "./style.module.css";
import { GithubProfilProps } from "~/types/GithubProfilProps";
import { Link } from "@remix-run/react";

interface ProfilCardProps extends React.AllHTMLAttributes<HTMLDivElement> {
    DataProfil: GithubProfilProps;
}

export function ProfilCard(props: ProfilCardProps){
    const data = props.DataProfil;

    const URL_PROFILE = `https://github.com/${data.login}`;
    const URL_REPOS = `https://github.com/${data.login}?tab=repositories`;
    const URL_GISTS = `https://gist.github.com/${data.login}`;

    const CREATED_AT = ParseDate(new Date(data.created_at));
    const UPDATED_AT = ParseDate(new Date(data.updated_at));

    return(
        <div className={styles.Card} {...props}>
            
            <img src={data.avatar_url} alt={`${data.login}'s avatar`} 
            className={styles.Avatar} title={`${data.login}'s avatar`} />

            <h3 className={styles.Username} title={`ID: ${data.node_id}`}>{data.login} ({data.type})</h3>

            <table className={styles.Table}>
                <CardLine Title="Name" Value={data.name} />
                <CardLine Title="Company" Value={data.company} />
                <CardLine Title="Location" Value={data.location} />
                <CardLine Title="Repositories" Value={data.public_repos.toString()} URL={URL_REPOS} />
                <CardLine Title="Gists" Value={data.public_gists.toString()} URL={URL_GISTS} />
                <CardLine Title="Followers" Value={data.followers.toString()} />
                <CardLine Title="Following" Value={data.following.toString()} />
                <CardLine Title="Created at" Value={CREATED_AT} />
                <CardLine Title="Updated at" Value={UPDATED_AT} />
            </table>

            <Link to={URL_PROFILE} target="_blank" className={styles.GithubLink}>Go to his/her real Github profile</Link>

        </div>
    )
}

// CardLine
interface CardLineProps {
    Title: string;
    Value: string;
    URL?: string;
}

function CardLine(props: CardLineProps){
    return(
        <tr>
            <td className={styles.TitleTd}>{props.Title}</td>
            <td title={props.Title}>
                {
                    props.Value === null || props.Value === "" ? "N/A" : (
                        props.URL ? <Link to={props.URL} target="_blank">{props.Value}</Link> : props.Value
                    )
                }
            </td>
        </tr>
    )
}

function ParseDate(date: Date){
    const date_d = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const date_t = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return `${date_d} ${date_t}`;
}