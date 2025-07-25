// greenbook-backend/go-app/main.go

package main

/*
#cgo LDFLAGS: -L${SRCDIR}/../rust-lib/target/release -lgreenbook_rust_lib -lm # -lm might be needed on some systems for math functions
#include <stdlib.h> // Required for C.free and C.malloc (if used)
// Declare the Rust functions that Go will call.
// These declarations must match the Rust function signatures precisely.
extern char* process_string_in_rust(const char* input_ptr, unsigned long length);
extern void free_rust_string(char* ptr);
*/
import "C" // This line imports the C pseudo-package for Cgo.

import (
	"fmt"
	"log"
	"net/http"
	"unsafe" // For pointer manipulation with Cgo
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from Go Backend! The time is %s", C.GoString(C.process_string_in_rust(C.CString("Go is here"), 10))) // Example using Rust function
}

func rustTestHandler(w http.ResponseWriter, r *http.Request) {
	inputString := "Hello from Go to Rust!"

	// Convert Go string to C string
	cInput := C.CString(inputString)
	// Get length of the Go string (in bytes, assuming UTF-8)
	cLength := C.ulong(len(inputString))

	// Defer freeing the C string allocated by C.CString.
	// C.CString copies the Go string to C memory, which must be freed.
	defer C.free(unsafe.Pointer(cInput))

	// Call the Rust function
	cResultPtr := C.process_string_in_rust(cInput, cLength)

	// Defer freeing the Rust-allocated string.
	// CRITICAL: Go does not know how to free memory allocated by Rust's malloc.
	// We must call the Rust-provided `free_rust_string` function.
	defer C.free_rust_string(cResultPtr) // Use the Rust-provided free function!

	// Convert C string pointer returned by Rust to Go string
	goResult := C.GoString(cResultPtr)

	fmt.Fprintf(w, "Go sent: '%s'\nRust returned: '%s'", inputString, goResult)
}

func main() {
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/rust-test", rustTestHandler) // New endpoint to test Rust
	log.Println("Go Backend listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}