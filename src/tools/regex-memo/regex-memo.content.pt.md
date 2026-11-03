### Caracteres comuns

Expressão | Descrição
:--|:--
`.` ou `[^\n\r]` | qualquer caractere, *exceto* quebra de linha (newline) ou retorno de carro (carriage return)
`[A-Za-z]` | letras
`[a-z]` | letras minúsculas
`[A-Z]` | letras maiúsculas
`\d` ou `[0-9]` | dígito
`\D` ou `[^0-9]` | qualquer caractere que não seja dígito
`_` | sublinhado (underscore)
`\w` ou `[A-Za-z0-9_]` | letra, dígito ou sublinhado
`\W` ou `[^A-Za-z0-9_]` | o inverso de `\w`
`\S` | o inverso de `\s`

### Caracteres de espaço em branco

Expressão | Descrição
:--|:--
` ` | espaço
`\t` | tabulação
`\n` | quebra de linha (newline)
`\r` | retorno de carro (carriage return)
`\s` | espaço, tabulação, quebra de linha ou retorno de carro

### Conjunto de caracteres

Expressão | Descrição
:--|:--
`[xyz]` | `x`, `y` ou `z`
`[^xyz]` | nem `x`, nem `y`, nem `z`
`[1-3]` | `1`, `2` ou `3`
`[^1-3]` | nem `1`, nem `2`, nem `3`

- Pense em um conjunto de caracteres como uma operação `OU` sobre os caracteres entre os colchetes.
- Use `^` logo depois do `[` de abertura para “negar” o conjunto.
- Dentro de um conjunto de caracteres, `.` significa um ponto literal.

### Caracteres que precisam de escape

#### Fora de um conjunto de caracteres

Expressão | Descrição
:--|:--
`\.` | ponto
`\^` | acento circunflexo (caret)
`\$` | cifrão
`\|` | barra vertical (pipe)
`\\` | barra invertida
`\/` | barra
`\(` | parêntese de abertura
`\)` | parêntese de fechamento
`\[` | colchete de abertura
`\]` | colchete de fechamento
`\{` | chave de abertura
`\}` | chave de fechamento

#### Dentro de um conjunto de caracteres

Expressão | Descrição
:--|:--
`\\` | barra invertida
`\]` | colchete de fechamento

- Um `^` só precisa de escape se aparecer logo depois do `[` de abertura do conjunto.
- Um `-` só precisa de escape se aparecer entre duas letras ou dois dígitos.

### Quantificadores

Expressão | Descrição
:--|:--
`{2}` | exatamente 2
`{2,}` | pelo menos 2
`{2,7}` | pelo menos 2 e no máximo 7
`*` | 0 ou mais
`+` | 1 ou mais
`?` | exatamente 0 ou 1

- O quantificador vem *depois* da expressão a ser quantificada.

### Limites (âncoras)

Expressão | Descrição
:--|:--
`^` | início da string
`$` | fim da string
`\b` | limite de palavra

- Como funciona a correspondência de limite de palavra:
    - No início da string, se o primeiro caractere for `\w`.
    - Entre dois caracteres vizinhos da string, se o primeiro for `\w` e o segundo for `\W`.
    - No fim da string, se o último caractere for `\w`.

### Correspondência

Expressão | Descrição
:--|:--
`foo\|bar` | corresponde a `foo` ou a `bar`
`foo(?=bar)` | corresponde a `foo` se vier antes de `bar`
`foo(?!bar)` | corresponde a `foo` se *não* vier antes de `bar`
`(?<=bar)foo` | corresponde a `foo` se vier depois de `bar`
`(?<!bar)foo` | corresponde a `foo` se *não* vier depois de `bar`

### Agrupamento e captura

Expressão | Descrição
:--|:--
`(foo)` | grupo de captura; corresponde a `foo` e o captura
`(?:foo)` | grupo sem captura; corresponde a `foo`, mas *sem* capturá-lo
`(foo)bar\1` | `\1` é uma referência ao 1º grupo de captura; corresponde a `foobarfoo`

- Os grupos de captura só importam nos seguintes métodos:
    - `string.match(regexp)`
    - `string.matchAll(regexp)`
    - `string.replace(regexp, callback)`
- `\N` é uma referência ao `N`-ésimo grupo de captura. Os grupos são numerados a partir de 1.

## Referências e ferramentas

- [MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_expressions)
- [RegExplained](https://leaverou.github.io/regexplained/)
