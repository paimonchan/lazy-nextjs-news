# Tips to Reduce Claude Token Usage

## In-Session Tips
- **Be specific** — Vague prompts cause extra back-and-forth. Say exactly what file/function you want changed.
- **Use `/compact`** — Compresses conversation history to reduce context size.
- **Use `/clear`** — Clears conversation when switching to a new task.
- **Keep conversations short** — Start new sessions for unrelated tasks instead of continuing long ones.

## Model Selection
- **Use `/model` to switch models** — Use `haiku` for simple tasks (cheaper), save `opus` for complex ones.
- **Use `/fast`** — Uses faster output mode to reduce costs on straightforward tasks.

## Configuration
- **Use `CLAUDE.md`** — Add project context so Claude doesn't need to re-explore your codebase each session.
- **Use `.claudeignore`** — Exclude large/irrelevant files (like `node_modules`, build output, logs) from being read.

## Workflow Habits
- Read files yourself first, then point Claude to specific lines instead of asking it to search broadly.
- Avoid open-ended requests like "improve this codebase" — they trigger expensive multi-file exploration.
- Batch related changes in one request instead of making many small asks.

## Cost Monitoring
- Run `/usage` directly in the CLI to track your current session's token consumption.
- Check [console.anthropic.com](https://console.anthropic.com) for overall API usage.
