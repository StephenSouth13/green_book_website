// greenbook-backend/rust-lib/src/lib.rs

// This line is crucial for C compatibility. It tells Rust to expose
// this function with C calling conventions and to prevent name mangling.
#[no_mangle]
pub extern "C" fn process_string_in_rust(input_ptr: *const libc::c_char, length: libc::size_t) -> *mut libc::c_char {
    // Safety: Convert C string pointer to Rust String.
    // This is unsafe because we're trusting the input_ptr is valid and UTF-8.
    let input_bytes = unsafe { std::slice::from_raw_parts(input_ptr as *const u8, length) };
    let input_str = String::from_utf8_lossy(input_bytes);

    println!("Rust received: {}", input_str); // Log on the Rust side

    // Process the string: reverse it
    let reversed_str = input_str.chars().rev().collect::<String>();
    let output_str = format!("Rust processed: {}", reversed_str);

    // Convert the Rust String back to a C-compatible char*
    // This string needs to be null-terminated and allocated on the heap
    // so that Go can free it later.
    let c_string = std::ffi::CString::new(output_str).expect("CString::new failed");
    c_string.into_raw() // Into_raw consumes the CString and returns a raw pointer
}

// Function to free the memory allocated by Rust in `process_string_in_rust`
// Go needs to call this to prevent memory leaks.
#[no_mangle]
pub extern "C" fn free_rust_string(ptr: *mut libc::c_char) {
    if ptr.is_null() { return; }
    // Safety: Reconstruct the CString from the raw pointer and let it drop,
    // which will free the memory.
    unsafe {
        let _ = std::ffi::CString::from_raw(ptr);
    }
}