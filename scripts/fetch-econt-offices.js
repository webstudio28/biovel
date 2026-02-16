/**
 * Fetches all Econt offices from the demo API and saves to src/_data/econtOffices.json.
 * Demo credentials (Econt test env) – for dev/static data only.
 */
const fs = require('fs');
const path = require('path');

const DEMO_USER = 'iasp-dev';
const DEMO_PASS = '1Asp-dev';
const URL = 'https://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService.getOffices.json';
const OUT_PATH = path.join(__dirname, '..', 'src', '_data', 'econtOffices.json');

async function main() {
  const auth = Buffer.from(`${DEMO_USER}:${DEMO_PASS}`).toString('base64');
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error(`Econt API HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  if (data.type === 'ExException') throw new Error(data.message || 'Econt API error');
  const allOffices = data.offices ?? [];
  const bulgarianOffices = allOffices.filter(
    (o) => o.address?.city?.country?.code3 === 'BGR'
  );
  data.offices = bulgarianOffices;
  const count = bulgarianOffices.length;
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Saved ${count} Bulgarian offices (of ${allOffices.length} total) to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
