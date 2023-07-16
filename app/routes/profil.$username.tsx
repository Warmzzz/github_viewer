import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
import { GithubProfilProps } from "~/types/GithubProfilProps";
import styles from "~/styles/profil.$username.module.css";
import { ProfilCard } from "~/components/ProfilCard/ProfilCard";

const API_BASE_URL = "https://api.github.com/users";

export default function ProfilUsername(){
    const data = useLoaderData<typeof loader>()
    
    if(data.message){
        return(
            <main className={styles.Container}>
                <h2>This Github profil doesn't exist</h2>
                <Link to="/" className={styles.HomeLink}>Back to home</Link>
            </main>
        )
    } else {
        return(
            <main className={styles.Container}>

                {/* @ts-ignore */}
                <ProfilCard DataProfil={data} />

                <Link to="/" className={styles.BackLink}>
                    <button>Back to home</button>
                </Link>
                
            </main>
        )
    }
    
}

export async function loader({ params }: LoaderArgs){
    const username = params.username?.toString();
    const response: GithubProfilProps = await fetch(`${API_BASE_URL}/${username}`).then(res => res.json());
    return response;
}