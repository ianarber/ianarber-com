FROM ubuntu:20.04 as build-base

# ARG TARGETARCH
# ENV TARGETARCH "${TARGETARCH}"
# # The semver version associated with this build (i.e. v3.0.0)
# ARG NF_IMAGE_VERSION
# ENV NF_IMAGE_VERSION "${NF_IMAGE_VERSION:-latest}"
# # The commit SHA tag associated with this build
# ARG NF_IMAGE_TAG
# ENV NF_IMAGE_TAG "${NF_IMAGE_TAG:-latest}"
# # The codename associated with this build (i.e. focal)
# ARG NF_IMAGE_NAME
# ENV NF_IMAGE_NAME "${NF_IMAGE_NAME:-focal}"

# ENV LANGUAGE en_US:en
# ENV LANG en_US.UTF-8
# ENV LC_ALL en_US.UTF-8

# LABEL maintainer Netlify

################################################################################
#
# Dependencies
#
################################################################################

# language export needed for ondrej/php PPA https://github.com/oerdnj/deb.sury.org/issues/56
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y update && \
    # apt-get install -y --no-install-recommends software-properties-common language-pack-en-base apt-transport-https curl gnupg && \
    # echo 'Acquire::Languages {"none";};' > /etc/apt/apt.conf.d/60language && \
    # echo 'LANG="en_US.UTF-8"' > /etc/default/locale && \
    # echo 'LANGUAGE="en_US:en"' >> /etc/default/locale && \
    # locale-gen en_US.UTF-8 && \
    # update-locale en_US.UTF-8 && \
    # add-apt-repository -y ppa:ondrej/php && \
    # add-apt-repository -y ppa:git-core/ppa && \
    apt-get -y update && \
    apt-get install -y --no-install-recommends \
        advancecomp \
        # apache2-utils \
        autoconf \
        automake \
        bison \
        build-essential \
        bzr \
        cmake \
        # doxygen \
        elixir \
        # emacs-nox \
        expect \
        file \
        # fontconfig \
        # fontconfig-config \
        g++ \
        gawk \
        git \
        git-lfs \
        gifsicle \
        gobject-introspection \
        # graphicsmagick \
        # graphviz \
        gtk-doc-tools \
        curl \
        gnupg \
        gnupg2 \
        imagemagick \
        iptables \
        # jpegoptim \
        jq \
        # language-pack-ar \
        # language-pack-ca \
        # language-pack-cs \
        # language-pack-da \
        # language-pack-de \
        # language-pack-el \
        # language-pack-es \
        # language-pack-eu \
        # language-pack-fi \
        # language-pack-fr \
        # language-pack-gl \
        # language-pack-he \
        # language-pack-hi \
        # language-pack-it \
        # language-pack-ja \
        # language-pack-ka \
        # language-pack-ko \
        # language-pack-nn \
        # language-pack-pl \
        # language-pack-pt \
        # language-pack-ro \
        # language-pack-ru \
        # language-pack-sv \
        # language-pack-ta \
        # language-pack-th \
        # language-pack-tr \
        # language-pack-uk \
        # language-pack-vi \
        # language-pack-zh-hans \
        # language-pack-zh-hant \
        libasound2 \
        libcurl4 \
        libcurl4-gnutls-dev \
        libenchant1c2a \
        libexif-dev \
        libffi-dev \
        libfontconfig1 \
        libgbm1 \
        libgconf-2-4 \
        libgd-dev \
        libgdbm-dev \
        libgif-dev \
        libglib2.0-dev \
        libgmp3-dev \
        libgsl23 \
        libgsl-dev \
        libgtk-3-0 \
        libgtk2.0-0 \
        libicu-dev \
        # libimage-exiftool-perl \
        # libjpeg-progs \
        # libjpeg-turbo8-dev \
        # libmagickwand-dev \
        libmcrypt-dev \
        libncurses5-dev \
        libnss3 \
        libpng-dev \
        libreadline6-dev \
        librsvg2-bin \
        libsm6 \
        libsqlite3-dev \
        libssl-dev \
        libtiff5-dev \
        libtool \
        libwebp-dev \
        libwebp6 \
        libxml2-dev \
        libxrender1 \
        libxslt-dev \
        libxss1 \
        libxtst6 \
        libvips-dev \
        libvips-tools \
        libyaml-dev \
        mercurial \
        # musl and musl-tools are needed for certain rust dependencies (ring) to compile correctly
        # see https://github.com/netlify/pillar-runtime/issues/401
        musl \
        musl-tools \
        nasm \
        # openjdk-8-jdk \
        optipng \
        # php7.4 \
        # php7.4-xml \
        # php7.4-mbstring \
        # php7.4-gd \
        # php7.4-sqlite3 \
        # php7.4-curl \
        # php7.4-zip \
        # php7.4-intl \
        # php8.0 \
        # php8.0-xml \
        # php8.0-mbstring \
        # php8.0-gd \
        # php8.0-sqlite3 \
        # php8.0-curl \
        # php8.0-zip \
        # php8.0-intl \
        # pngcrush \
        # procps is needed for homebrew on linux arm
        procps \
        # python-setuptools \
        # python3-setuptools \
        # python3.8-dev \
        rlwrap \
        rsync \
        software-properties-common \
        sqlite3 \
        ssh \
        strace \
        swig \
        tree \
        unzip \
        virtualenv \
        wget \
        # xfonts-base \
        # xfonts-75dpi \
        xvfb \
        zip \
        zstd \
      # dotnet core dependencies
        libunwind8-dev \
        libicu-dev \
        liblttng-ust0 \
        libkrb5-3 && \
    # install erlang
    # wget --quiet https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && \
    # dpkg -i erlang-solutions_2.0_all.deb && \
    # apt-get -y update && \
    # apt-get install -y --no-install-recommends \
    #     esl-erlang && \
    # Clean up
    # /var/lib/dpkg/info/ca-certificates-java.postinst configure && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y && \
    unset DEBIAN_FRONTEND

FROM build-base as build-image

# ARG TARGETARCH
################################################################################
#
# Pandoc & Wkhtmltopdf
#
################################################################################

# ENV PANDOC_VERSION 2.13

# RUN wget -nv --quiet https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.focal_$TARGETARCH.deb && \
#     dpkg -i wkhtmltox_0.12.6-1.focal_$TARGETARCH.deb && \
#     rm wkhtmltox_0.12.6-1.focal_$TARGETARCH.deb && \
#     wkhtmltopdf -V && \
#     # install Pandoc (more recent version to what is provided in Ubuntu 14.04)
#     wget --quiet https://github.com/jgm/pandoc/releases/download/$PANDOC_VERSION/pandoc-$PANDOC_VERSION-1-$TARGETARCH.deb && \
#     dpkg -i pandoc-$PANDOC_VERSION-1-$TARGETARCH.deb && \
#     rm pandoc-$PANDOC_VERSION-1-$TARGETARCH.deb && \
#     pandoc -v

################################################################################
#
# Elm compiler
#
################################################################################
# RUN curl -L -o elm.gz https://github.com/elm/compiler/releases/download/0.19.1/binary-for-linux-64-bit.gz \
#     && gunzip elm.gz \
#     && chmod +x elm \
#     && mv elm /usr/local/bin/

################################################################################
#
# User
#
################################################################################

# RUN adduser --system --disabled-password --uid 2500 --group --quiet buildbot --home /opt/buildhome

################################################################################
#
# Ruby
#
################################################################################

## TODO: Consider switching to rbenv or asdf-vm
# USER buildbot
RUN curl -sSL https://rvm.io/mpapis.asc | gpg --import - && curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import && \
    curl -sL https://get.rvm.io | bash -s stable --with-gems="bundler" --autolibs=read-fail

# ENV PATH /usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Match this set latest Stable releases we can support on https://www.ruby-lang.org/en/downloads/
ENV RUBY_VERSION=2.7.2
ENV RUBY_2_6_VERSION=2.6.6
# Also preinstall Ruby 2.6, as many customers are pinned to it and installing is slow
RUN /bin/bash -c "source ~/.rvm/scripts/rvm && \
                  rvm install $RUBY_2_6_VERSION && rvm use $RUBY_2_6_VERSION && gem install bundler && \
                  rvm install $RUBY_VERSION && rvm use $RUBY_VERSION && gem install bundler && \
                  rvm use $RUBY_VERSION --default && rvm cleanup all"

ENV PATH /usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin



ENV NODE_VERSION=6.17.1
ENV NVM_VERSION=0.39.1

# Install nvm with node and npm
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION/install.sh | bash
RUN source /root/.bashrc && nvm install $NODE_VERSION
SHELL ["/bin/bash", "--login", "-c"]

# RUN curl https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
#     && . $NVM_DIR/nvm.sh \
#     && nvm install $NODE_VERSION \
#     && nvm alias default $NODE_VERSION \
#     && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# USER root




