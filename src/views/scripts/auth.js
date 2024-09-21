function toggle_error_info(error_block_id){
    let block = document.getElementById(error_block_id)
    // block.style.display === 'none' ? 'block' : 'none'
    if(block.style.display === 'block')
        block.style.display = 'none'
    else
        block.style.display = 'block'
}

// module.exports = toggle_error_info