# Stripped down config, please refer to zsh and omz documentation for more configuration options

export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Path to your Oh My Zsh installation.
export ZSH=$HOME/.oh-my-zsh

ZSH_THEME="random"

# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )
# Name *
# CASE_SENSITIVE="true"

# HYPHEN_INSENSITIVE="true"

# zstyle ':omz:update' mode disabled  # disable automatic updates
zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

zstyle ':omz:update' frequency 7

# DISABLE_MAGIC_FUNCTIONS="true"

# DISABLE_LS_COLORS="true"

# DISABLE_AUTO_TITLE="true"

ENABLE_CORRECTION="true"

COMPLETION_WAITING_DOTS="true"

DISABLE_UNTRACKED_FILES_DIRTY="true"

HIST_STAMPS="mm/dd/yyyy"

ZSH_CUSTOM=~/.oh-my-zsh/custom/

plugins=(emotty zsh-history-substring-search zsh-syntax-highlighting zsh-autosuggestions zsh-completions aliases colored-man-pages command-not-found cp github gitignore golang systemd pip python nvm tugboat tmux git npm zoxide 1password archlinux brew docker docker-compose git-extras sudo thefuck zsh-interactive-cd)

fpath=($ZSH_CUSTOM/plugins/zsh-completions/src $fpath)
source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
 if [[ -n $SSH_CONNECTION ]]; then
   export EDITOR='nvim'
 else
   export EDITOR='vim'
 fi

export ARCHFLAGS="-arch $(uname -m)"

zshcache_time="$(date +%s%N)"

autoload -Uz add-zsh-hook

rehash_precmd() {
  if [[ -a /var/cache/zsh/pacman ]]; then
    local paccache_time="$(date -r /var/cache/zsh/pacman +%s%N)"
    if (( zshcache_time < paccache_time )); then
      rehash
      zshcache_time="$paccache_time"
    fi
  fi
}

add-zsh-hook -Uz precmd rehash_precmd

# custom and experimental commands as aliases while under development

alias update-dots="~/dotfiles/update.sh"
alias discordstatus="~/dotfiles/discordstatus.sh"
alias zenithmodinit="~/dotfiles/zenithmodinit.sh"


# tmux
alias sourcet="source ~/.tmux.conf"

# omz
alias zshconfig="nvim ~/.zshrc"
alias ohmyzsh="nvim ~/.oh-my-zsh"
alias sourcez="source ~/.zshrc"

# ls
alias l='ls -lh'
alias ll='ls -lah'
alias la='ls -A'
alias lm='ls -m'
alias lr='ls -R'
alias lg='ls -l --group-directories-first'

# git
alias gcl='git clone'
alias gi='git init'
alias ga='git add .'
alias gc='git commit -m "zsh did it for me"'
alias gclone="git clone git@github.com:"
alias gp='git push'
alias gstat="git status"
alias gstash="git stash"
alias git pull="git pull --recurse-submodules"


# File Development and editing (testin)
alias envedit="nvim $(pwd)/.env"
alias editreadme="nvim $(pwd)/README.md"

# Terminal Commands
alias ,="pwd"
alias w="whoami"
alias c="clear"
alias cp='cp -r'
