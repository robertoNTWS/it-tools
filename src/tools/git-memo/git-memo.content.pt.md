## Configuração

Defina a configuração global

```shell
git config --global user.name "[nome]"
git config --global user.email "[email]"
```

## Primeiros passos

Crie um repositório git

```shell
git init
```

Clone um repositório git existente

```shell
git clone [url]
```

## Commit

Faça commit de todas as alterações rastreadas

```shell
git commit -am "[mensagem do commit]"
```

Adicione novas modificações ao último commit

```shell
git commit --amend --no-edit
```

## Cometi um erro

Altere a mensagem do último commit

```shell
git commit --amend
```

Desfaça o commit mais recente e mantenha as alterações

```shell
git reset HEAD~1
```

Desfaça os `N` commits mais recentes e mantenha as alterações

```shell
git reset HEAD~N
```

Desfaça o commit mais recente e descarte as alterações

```shell
git reset HEAD~1 --hard
```

Volte a branch para o estado do remoto

```shell
git fetch origin
git reset --hard origin/[nome-da-branch]
```

## Diversos

Renomeie a branch local master para main

```shell
git branch -m master main
```
