# Prosper Academy
Responsive, buildless marketing website for Prosper Academy. Features two teachers, Cambridge/Edexcel class filters, October 2026 schedules, original faculty posters, upcoming online lectures and FAQs.

## Run
Serve `dist/` using any static web server. No build or install step is required. For example: `python -m http.server 8000 --directory dist`.

## Edit
- `dist/index.html`: content and schedule
- `dist/styles.css`: responsive styles
- `dist/app.js`: course filtering
- `dist/assets/`: original user-supplied faculty posters and Prosper logo from the branding folder

The logo and portrait crops are CSS-only; original assets are preserved. Google Fonts is optional; system fonts provide a fallback.

## Content status
Teacher credentials and class times follow the supplied EduPen faculty posters. A Levels, IELTS and online lectures are marked as planned. No checkout, student accounts, lead storage or paid courses are implemented. EduPen Banani is at House # 58/B, Road # 21, Kemal Ataturk Ave, Dhaka 1213. The location action opens the user-supplied Google Maps link for the same building. Add a verified admissions phone/WhatsApp or email when available.

## Hosting
Deploy `dist/` with any static host. The `.openai/hosting.json` file identifies the private Sites deployment. Existing prosper.academy DNS has not been changed.

## GitHub
Source repository: https://github.com/saif-kabeer/prosper

## Motion
Native CSS and Web Animations provide staggered headline entrances, scroll reveals, floating portraits, orbiting accents, animated lecture artwork, pointer-responsive cards/buttons, filter transitions and a reading progress line. A persistent Pause motion control and the system reduced-motion preference disable animation. Touch devices omit pointer effects; offscreen decorative animations pause. Content remains visible without JavaScript. No animation dependencies or scroll hijacking.
