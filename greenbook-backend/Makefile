.PHONY: all build_rust build_go clean

RUST_LIB_DIR := rust-lib
GO_APP_DIR := go-app
BUILD_DIR := $(RUST_LIB_DIR)/target/release

# Default target
all: build_go

# Build the Rust library
build_rust:
	@echo "Building Rust library..."
	cd $(RUST_LIB_DIR) && cargo build --release --lib

# Build the Go application, linking the Rust library
build_go: build_rust
	@echo "Building Go application..."
	# GOARCH and GOOS might be needed for cross-compilation, but often not for local dev.
	# CGO_ENABLED=1 is crucial for Cgo.
	# We compile from the root of go-app, referencing the Rust library with -L
	cd $(GO_APP_DIR) && CGO_ENABLED=1 go build -o greenbook-backend-app -ldflags="-extldflags=-lm"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(GO_APP_DIR)/greenbook-backend-app
	cd $(RUST_LIB_DIR) && cargo clean