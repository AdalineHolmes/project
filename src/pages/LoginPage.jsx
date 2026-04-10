import { useState } from "react";
import { ALLOWED_USERS, ALLOWED_PASS } from "../data/poems";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "", password: "", phone: "",
    bday: "", gender: "", reason: "Friends", comment: "",
  });
  const [errors, setErrors] = useState({});

  const set = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!ALLOWED_USERS.includes(form.username)) errs.username = "Username is Invalid";
    if (!ALLOWED_PASS.includes(form.password))  errs.password = "Password is Invalid";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate("/home"); 
  };

  return (
    <div className="l-wrap pg">
      <div className="l-bg-text" aria-hidden="true">Welcome</div>

      <div className="l-card">
        <form className="l-form" onSubmit={submit}>

          <div className="l-field">
            <label className={errors.username ? "err" : ""}>
              {errors.username || "Username:"}
            </label>
            <input
              name="username" value={form.username} onChange={set}
              placeholder="Something" autoComplete="username" required
            />
          </div>

          <div className="l-field">
            <label className={errors.password ? "err" : ""}>
              {errors.password || "Password:"}
            </label>
            <input
              type="password" name="password" value={form.password} onChange={set}
              placeholder="••••••" minLength={6} maxLength={12}
              autoComplete="current-password" required
            />
          </div>

          <div className="l-field">
            <label>Phone:</label>
            <input
              type="tel" name="phone" value={form.phone} onChange={set}
              placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
          </div>

          <div className="l-field">
            <label>Birthday:</label>
            <input type="date" name="bday" value={form.bday} onChange={set} />
          </div>

          <div className="l-field">
            <label>Gender:</label>
            <div className="l-radio">
              {["male", "female", "other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio" name="gender" value={g}
                    checked={form.gender === g} onChange={set}
                  />
                  {g[0].toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="l-field">
            <label>How did u find out about our site</label>
            <select name="reason" value={form.reason} onChange={set}>
              {["Friends", "Family", "Magic"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="l-field">
            <label>Thoughts???????????</label>
            <textarea name="comment" rows={3} value={form.comment} onChange={set} />
          </div>

          <button type="submit" className="l-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
