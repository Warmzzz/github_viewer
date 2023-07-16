import styles from "../styles/index.module.css";
import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export default function Index() {

  const actionData = useActionData<typeof action>();

  return (
    <main className={styles.Container}>

      <Form method="POST" className={styles.Form}>
        
        <input type="text" placeholder="Enter a Github username" 
        name="username" className={styles.Input} required />

        <button type="submit" className={styles.SubmitButton}>Search</button>

        {
          actionData?.message && <span className={styles.AlertMessage}>{actionData?.message}</span>
        }

      </Form>

    </main>
  );
}

export async function action({ request }: ActionArgs){
  const body = await request.formData();
  const username = await body.get("username")?.toString();
  if(username === null || !username?.trim()){
    return json({
      message: "Please enter a valid username",
      status: 400,
    })
  } else {
    return redirect(`/profil/${username}`);
  }
}