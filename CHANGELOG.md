# Changelog

### [3.1.3](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.1.2...butler-icon-upload-v3.1.3) (2022-04-09)


### Bug Fixes

* **deps:** update dependency eslint-config-prettier to v8.5.0 ([4c7a9f1](https://github.com/ptarmiganlabs/butler-icon-upload/commit/4c7a9f1775acafb29d1d9fc2a8925fc564863b85))


### Miscellaneous

* **deps:** bump minimist from 1.2.5 to 1.2.6 ([f140581](https://github.com/ptarmiganlabs/butler-icon-upload/commit/f1405814a33687381b9f50b06ee38edbae18b67a))
* **deps:** update actions/checkout action to v3 ([d2da103](https://github.com/ptarmiganlabs/butler-icon-upload/commit/d2da103a1b68407d1d156b39b9907b95acf63f29))
* **deps:** update actions/download-artifact action to v3 ([ad97eeb](https://github.com/ptarmiganlabs/butler-icon-upload/commit/ad97eebdceaabb1b3ee807fb31fca1d91ef013b5))
* **deps:** update actions/upload-artifact action to v3 ([f830f94](https://github.com/ptarmiganlabs/butler-icon-upload/commit/f830f94797afe74312024126547f250af5ecd906))
* **deps:** update dependency prettier to v2.6.2 ([86fb602](https://github.com/ptarmiganlabs/butler-icon-upload/commit/86fb602d89244e48dc16c39de504001303518a2d))
* **deps:** update dependency snyk to v1.900.0 ([b4f3db8](https://github.com/ptarmiganlabs/butler-icon-upload/commit/b4f3db8014af8f0a54a2a7558e8e1d44c686927a))

### [3.1.2](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.1.1...butler-icon-upload-v3.1.2) (2022-02-03)


### Bug Fixes

* CI tweaking ([b3d2c6a](https://github.com/ptarmiganlabs/butler-icon-upload/commit/b3d2c6ac12657155ae03ecff94f6f9a8317c69d3))

### [3.1.1](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.1.0...butler-icon-upload-v3.1.1) (2022-02-03)


### Refactoring

* Tweak CI ([1955daa](https://github.com/ptarmiganlabs/butler-icon-upload/commit/1955daa22fbbb5bcf91a12aa5d93f96b0c6d77b4))

## [3.1.0](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.0.2...butler-icon-upload-v3.1.0) (2022-02-03)


### Features

* Sign and notarise macOS binaries ([ba8e69a](https://github.com/ptarmiganlabs/butler-icon-upload/commit/ba8e69a0f8d837051254ff929001f6181293edb0)), closes [#52](https://github.com/ptarmiganlabs/butler-icon-upload/issues/52)

### [3.0.2](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.0.1...butler-icon-upload-v3.0.2) (2022-02-02)


### Miscellaneous

* Fix broken stand-alone binaries ([e9eda4f](https://github.com/ptarmiganlabs/butler-icon-upload/commit/e9eda4f55314bcfd9527836188955215e515b7cd))

### [3.0.1](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v3.0.0...butler-icon-upload-v3.0.1) (2022-02-02)


### Miscellaneous

* Fix broken deployment logic for binaries ([84a5b1d](https://github.com/ptarmiganlabs/butler-icon-upload/commit/84a5b1d064d5ea4b5c43a755201e7b8e462de96d))

## [3.0.0](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v2.2.0...butler-icon-upload-v3.0.0) (2022-02-02)


### ⚠ BREAKING CHANGES

* All options now set via command line

### Features

* All options now set via command line ([2aa19f9](https://github.com/ptarmiganlabs/butler-icon-upload/commit/2aa19f91b1d4929dea5d8656e58476bfd2872810)), closes [#43](https://github.com/ptarmiganlabs/butler-icon-upload/issues/43)
* Create stand-alone binaries for common OSs ([70b7272](https://github.com/ptarmiganlabs/butler-icon-upload/commit/70b727201b67d49b7277aae8854bad70a0c09d28))


### Miscellaneous

* Update dependencies ([010009a](https://github.com/ptarmiganlabs/butler-icon-upload/commit/010009a415d65c949e089c3457796a0872ce2c5a))

## [2.2.0](https://github.com/ptarmiganlabs/butler-icon-upload/compare/butler-icon-upload-v2.1.0...butler-icon-upload-v2.2.0) (2022-02-01)


### Features

* Add automatic release mgmt ([71da54f](https://github.com/ptarmiganlabs/butler-icon-upload/commit/71da54f43fe29c4a6a152c72df90df5fef73ba2b)), closes [#24](https://github.com/ptarmiganlabs/butler-icon-upload/issues/24)
* Add options for timing of image uploads ([e09e3ef](https://github.com/ptarmiganlabs/butler-icon-upload/commit/e09e3eff63772fbd26f3955a26bfa92a18b4b43d)), closes [#36](https://github.com/ptarmiganlabs/butler-icon-upload/issues/36)
* Add proper image upload queue ([ee87e9a](https://github.com/ptarmiganlabs/butler-icon-upload/commit/ee87e9a865c6ab5137d7b7d76122fdc5a1050a39)), closes [#35](https://github.com/ptarmiganlabs/butler-icon-upload/issues/35)
* Better log output when errors occur ([3faf4f5](https://github.com/ptarmiganlabs/butler-icon-upload/commit/3faf4f5f2b924b0aef24fd51ddf7869653987b31))
* Show in log how many files will be uploaded ([53cd882](https://github.com/ptarmiganlabs/butler-icon-upload/commit/53cd88233716317fa9b09ddf1f02ee7afd60adbc)), closes [#33](https://github.com/ptarmiganlabs/butler-icon-upload/issues/33)


### Refactoring

* Add settings for Visual Studio Code ([05202fe](https://github.com/ptarmiganlabs/butler-icon-upload/commit/05202fe0373afdf436f7c3e6ca2416cbcf567bbd))
* Better source code formatting and linting ([ffa9879](https://github.com/ptarmiganlabs/butler-icon-upload/commit/ffa9879e0e52922f2b4f84988c6abdca840b5a65))
* Tweak Git settings ([63c4f63](https://github.com/ptarmiganlabs/butler-icon-upload/commit/63c4f63a64224913846b2de81c90a967164b153b))
