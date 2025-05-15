// The useFormStatus hook is used to get the form status of the current form. It returns an object with the following properties:
// pending: a boolean indicating whether the form is currently being submitted
// submitting: a boolean indicating whether the form is currently being submitted
// formData: the FormData object containing the form data
// formAction: the action function to be called when the form is submitted
// Note that this hook cann't be used inside the component that is rendered by the action function, the component that has the form element.
import { useFormStatus } from "react-dom";
export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submittin..." : "Submit"}
      </button>
    </p>
  );
}
