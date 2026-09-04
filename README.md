# Festival Lumine de Artes

Site institucional do Lumine e sistema de inscrições do Festival Lumine de
Artes. O projeto inclui página pública, formulário de inscrição, consulta por
CPF, FAQ, termos, login administrativo, exportação CSV e banco
persistente.

## Tecnologias

- Next.js 16 e React 19
- TypeScript
- SQLite nativo do Node.js
- Docker e Docker Compose
- Sessão administrativa assinada e protegida por cookie HTTP-only

## Desenvolvimento no VS Code

```bash
npm ci
npm run dev
```

O modo local abre o site em `http://localhost:3000`. Para testar a área
administrativa com autenticação e persistência iguais à hospedagem, use Docker.

## Docker e hospedagem própria

Leia [SELF_HOSTING.md](SELF_HOSTING.md). O guia mostra como configurar o
arquivo `.env`, iniciar os contêineres, criar o repositório GitHub, preservar o
banco e preparar HTTPS.

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm test
```

## Dados ainda pendentes do evento

Antes da publicação definitiva, confirme data, horário, faixa etária,
capacidade, taxa, política de pagamento e regras finais. A página de termos é
uma minuta e deve ser revisada pela direção do Lumine.
