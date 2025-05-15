import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  // using async with the form action function tells react to wait for the promise that is returned by this action function to resolve before it internally marks this form as submitted
  // and before it navigates to the new page. This is important because we want to show the user a success message or an error message before navigating away from the page.
  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    // Validate the input
    let errors = [];
    if (!userName.trim()) {
      errors.push("Name is required.");
    }
    if (title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long.");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        fields: {
          userName: userName,
          title: title,
          body: body,
        },
      };
    }
    // submit to backend
    const opinion = {
      userName: userName,
      title: title,
      body: body,
    };

    await addOpinion(opinion);

    // clean the form
    return {
      errors: null,
      fields: {
        userName: "",
        title: "",
        body: "",
      },
    };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
    fields: {
      userName: "",
      title: "",
      body: "",
    },
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.fields?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.fields?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.fields?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
