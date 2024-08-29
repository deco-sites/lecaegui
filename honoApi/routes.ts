import { Hono } from '@hono/hono'

const app = new Hono()

interface Guest {
  Nome: string;
  "É +1?": string;
  [key: string]: any; 
}

//Guest list
app.get('/api/guests', async (c : any) => {
  const query = c.req.query('guest') || ''

  try {
    const response = await fetch('https://sheetdb.io/api/v1/z3ptvzy0q8j79')
    const data : Guest[] = await response.json()

    const guests = data
      .filter((guest: any) => guest["É +1?"] !== "Sim")
      .map((guest: any) => guest.Nome)

    const results = guests.filter(guest =>
      guest.toLowerCase().includes(query.toLowerCase())
    )

    // Gera o HTML com os resultados
    const html = results.map(guest => `
      <li>
        <button 
          class="text-blue-500 underline"
          hx-get="localhost:8002/select-guest?guest=${guest}" 
          hx-target="#guest-input" 
          hx-swap="outerHTML"
        >
          ${guest}
        </button>
      </li>
    `).join('')

    return c.html(html || '<li>Nenhum convidado encontrado</li>')
  } catch (error) {
    console.error('Erro ao buscar os dados:', error)
    return c.html('<li>Erro ao buscar convidados</li>')
  }
})


//Confirmation
app.patch('/api/confirm/:name', async (c : any) => {

  const { name } = c.req.param();

  try {
    const response = await fetch(`https://sheetdb.io/api/v1/58f61be4dda40/Nome/${name}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          Confirmed: 'Sim',
        },
      }),
    });

    const result = await response.json();

    return c.json(result)
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
      c.json(error)
  }
});


app.get('/select-guest', (c : any) => {
  const guest = c.req.query('guest') || '';
  return c.html(`
    <input type="hidden" value="${guest}" />
    <div>Você selecionou: ${guest}</div>
  `);
});

//---------------------------------


app.get('/guests', async (c : any) => {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/z3ptvzy0q8j79')
    const data = await response.json()

    const guests = data
      .filter((guest: any) => guest["É +1?"] !== "Sim")
      .map((guest: any) => guest.Nome)

    return c.json(guests)
  } catch (error) {
    console.error('Erro ao buscar os dados:', error)
    return c.json({ error: 'Não foi possível obter os dados' }, 500)
  }
})

app.get('/guests/all', async (c : any) => {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/z3ptvzy0q8j79')
    const data = await response.json()

    const guests = data
      .map((guest: any) => guest.Nome)

    return c.json(data)
  } catch (error) {
    console.error('Erro ao buscar os dados:', error)
    return c.json({ error: 'Não foi possível obter os dados' }, 500)
  }
})

Deno.serve({ port: 8002} ,app.fetch)
