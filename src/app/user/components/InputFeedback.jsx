export default function InputFeedback({ message }) {
  return (
    <label className="label">
      <span className="label-text-alt text-red-600">{message}</span>
    </label>
  );
}
